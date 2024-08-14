package justartschool.backend.dtos;

import lombok.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AuthenticationRequest {
    @NonNull
    private String token;
    @NonNull
    private String userName;
    @NonNull
    private String email;
    @NonNull
    private String password;
}
