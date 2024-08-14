package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import jakarta.persistence.Transient;
import justartschool.backend.models.entities.Role;
import justartschool.backend.models.entities.User;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserAccount {
    @Transient
    private MultipartFile profilePictureFile;
    private String profileImageData;
    private String profileImageBase64;
    @Nullable
    private String fileType;
    @NonNull
    private String userName;
    @NonNull
    private String email;
    @Nullable
    private String password;
    @Nullable
    private Boolean enabled;
    @Nullable
    private List<UUID> roleIds = new ArrayList<>();

    public UserAccount(User user) {
        this.userName = user.getUserName();
        this.email = user.getEmail();
        this.enabled = user.isEnabled();

        if (user.getProfilePicture() != null) {
            this.fileType = user.getProfilePictureTypeFile();
            this.profileImageBase64 = Base64.getEncoder().encodeToString(user.getProfilePicture());
            this.profileImageData = fileType + profileImageBase64;
        }

        for (Role role : user.getRoles()) {
            UUID roleId = role.getRoleId();
            this.roleIds.add(roleId);
        }
    }
}