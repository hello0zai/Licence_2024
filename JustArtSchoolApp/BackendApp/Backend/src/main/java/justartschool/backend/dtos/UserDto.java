package justartschool.backend.dtos;

import jakarta.persistence.Transient;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {
    @Transient
    private MultipartFile profilePictureFile;
    private String profileImageData;
    private String profileImageBase64;
    private String password;
    @NonNull
    private String userName;
    @NonNull
    private String email;
    private Boolean accountNonExpired;
    private Boolean accountNonLocked;
    private Boolean credentialsNonExpired;
    private Boolean enabled;
    private List<RoleDto> roleDtoList = new ArrayList<>();
}
