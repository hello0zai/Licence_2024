package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import justartschool.backend.models.entities.Role;
import lombok.*;

import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RoleDto {
    @Nullable
    private UUID roleId;
    @NotNull
    private String name;

    public RoleDto(Role role) {
        this.roleId = role.getRoleId();
        this.name = role.getName();
    }
}