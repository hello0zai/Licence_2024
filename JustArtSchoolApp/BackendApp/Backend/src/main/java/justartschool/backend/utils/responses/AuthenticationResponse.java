package justartschool.backend.utils.responses;

import justartschool.backend.models.entities.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AuthenticationResponse {
    private String token;
    private User user;
    private List<String> roles;
}
