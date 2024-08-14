package justartschool.backend.services;

import justartschool.backend.authentication.ArtSchoolUserDetails;
import justartschool.backend.dtos.AuthenticationRequest;
import justartschool.backend.dtos.RegisterRequest;
import justartschool.backend.dtos.RoleDto;
import justartschool.backend.dtos.UserAccount;
import justartschool.backend.models.entities.Role;
import justartschool.backend.models.entities.User;
import justartschool.backend.repositories.IUsersRepository;
import justartschool.backend.utils.errors.BadRequestException;
import justartschool.backend.utils.errors.ExceptionProvider;
import justartschool.backend.utils.errors.NotFoundException;
import justartschool.backend.utils.responses.AuthenticationResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AuthenticationService {
    private final ExceptionProvider exceptionProvider;
    private final IUsersRepository userRepository;
    private final ArtSchoolUserDetailsService artSchoolUserDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RolesService rolesService;

    private Collection<Role> getRolesFromRegisterRequest(List<String> roleNames) {
        Collection<Role> roles = new ArrayList<>();
        for (String roleName : roleNames) {
            RoleDto roleDto = RoleDto.builder().name(roleName).build();
            roles.add(rolesService.getRoleByNameOrSaveRole(roleDto));
        }
        return roles;
    }

    public AuthenticationResponse register(RegisterRequest request) {
        Collection<Role> userRoles = getRolesFromRegisterRequest(request.getRoleNames());

        var user = User.builder()
                .userName(request.getUserName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(userRoles)
                .enabled(request.getEnabled())
                .build();

        userRepository.save(user);
        var userDetails = ArtSchoolUserDetails.builder()
                .user(user)
                .build();

        var jwtToken = jwtService.generateToken(userDetails);
        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse addUser(UserAccount userAccount) {
        List<UUID> roleIds = userAccount.getRoleIds();
        List<Role> roles = new ArrayList<>();
        for (UUID roleId : roleIds) {
            Role currentRole = rolesService.getRoleById(roleId);
            if (currentRole != null) {
                roles.add(currentRole);
            }
        }
        var user = User.builder()
                .userName(userAccount.getUserName())
                .email(userAccount.getEmail())
                .password(passwordEncoder.encode("parola"))
                .roles(roles)
                .enabled(userAccount.getEnabled())
                .build();
        userRepository.save(user);

        var userDetails = ArtSchoolUserDetails.builder()
                .user(user)
                .build();

        var jwtToken = jwtService.generateToken(userDetails);
        return AuthenticationResponse
                .builder()
                .user(user)
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) throws BadRequestException, NotFoundException {
        String email = request.getEmail();
        String password = request.getPassword();

        if (email == null)
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("Email is required");

        if (password == null)
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("Password is required");

        User user = userRepository.findByEmail(email).orElseThrow(() -> exceptionProvider.NOT_FOUND_EXCEPTION("User doesn't exist."));

        if (user == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("User with this email doesn't exist.");

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        password
                )
        );

        ArtSchoolUserDetails myUserDetails = artSchoolUserDetailsService.loadUserByUsername(user.getEmail());
        var jwtToken = jwtService.generateToken(myUserDetails);
        List<String> roles = new ArrayList<>();
        for (Role role : myUserDetails.getUser().getRoles()) {
            roles.add(role.getName() + "_ROLE");
        }

        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .user(myUserDetails.getUser())
                .roles(roles)
                .build();
    }

    public boolean checkToken(AuthenticationRequest request) throws BadRequestException {
        String token = request.getToken();
        if (token == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("Token is required.");
        }

        return jwtService.isTokenValid(token);
    }
}