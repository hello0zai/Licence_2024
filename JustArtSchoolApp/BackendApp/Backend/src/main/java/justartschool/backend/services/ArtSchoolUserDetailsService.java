package justartschool.backend.services;

import justartschool.backend.authentication.ArtSchoolUserDetails;
import justartschool.backend.dtos.UserAccount;
import justartschool.backend.models.entities.User;
import justartschool.backend.repositories.IUsersRepository;
import justartschool.backend.utils.errors.BadRequestException;
import justartschool.backend.utils.errors.ExceptionProvider;
import justartschool.backend.utils.errors.NotFoundException;
import justartschool.backend.utils.errors.UnauthorizedException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

@Service
@Primary
@AllArgsConstructor
public class ArtSchoolUserDetailsService implements UserDetailsService {
    private final ExceptionProvider exceptionProvider;
    private final IUsersRepository repository;
    private final ModelMapper modelMapper;

    @Override
    public ArtSchoolUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> userOptional = Optional.ofNullable(repository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User does not exist.")));

        return ArtSchoolUserDetails.builder()
                .user(userOptional.get())
                .build();
    }

    public User getUserById(UUID userId) {
        return repository.findUserByUserId(userId);
    }

    public UserAccount getUserByEmail(String email, ArtSchoolUserDetails currentUser) throws BadRequestException, UnauthorizedException, NotFoundException {
        if (email == null)
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("");

        User user = repository.findByEmail(email).orElseThrow(() -> exceptionProvider.NOT_FOUND_EXCEPTION("User doesn't exist."));

        if (user == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("User with id not found.");

        if (!(currentUser.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                currentUser.getUser().getEmail().equals(user.getEmail()))) {
            throw exceptionProvider.UNAUTHORIZED_EXCEPTION("Unauthorized to access this resource.");
        }

        return new UserAccount(user);
    }

    public void edit(UserAccount userAccount, ArtSchoolUserDetails artSchoolUserDetails) throws UnauthorizedException, NotFoundException, BadRequestException {
        if (userAccount == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("UserAccount is required.");
        }

        User user = repository.findByEmail(userAccount.getEmail()).orElseThrow(() -> exceptionProvider.NOT_FOUND_EXCEPTION("User with this email doesn't exist."));

        if (!(artSchoolUserDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                artSchoolUserDetails.getUser().getEmail().equals(user.getEmail()))) {
            throw exceptionProvider.UNAUTHORIZED_EXCEPTION("Unauthorized to access this resource.");
        }

        byte[] imageBytes = null;
        String imageHeader = null;
        if (userAccount.getProfileImageData() != null) {
            String base64Image = userAccount.getProfileImageData().trim();
            int headerEndIndex = base64Image.indexOf(',') + 1;

            imageHeader = base64Image.substring(0, headerEndIndex);
            String imageData = base64Image.substring(headerEndIndex);
            imageBytes = Base64.getDecoder().decode(imageData);
        }
        user.setProfilePictureTypeFile(imageHeader);
        user.setProfilePicture(imageBytes);

        user.setUserName(userAccount.getUserName());
        repository.save(user);
    }
}
