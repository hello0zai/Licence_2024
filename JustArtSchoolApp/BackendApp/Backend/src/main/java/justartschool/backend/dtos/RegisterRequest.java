package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import lombok.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RegisterRequest {
    @NonNull
    private String userName;
    @NonNull
    private String lastName;
    @NonNull
    private String firstName;
    @NonNull
    private String email;
    @NonNull
    private String password;
    @NonNull
    private Boolean enabled;
    @NonNull
    private List<String> roleNames = new ArrayList<>();
    @Nullable
    private Collection<RoleDto> roles = new ArrayList<>();
}