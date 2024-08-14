package justartschool.backend.models.compositePrimaryKeys;

import jakarta.persistence.Embeddable;
import lombok.*;
import org.jetbrains.annotations.NotNull;

import java.io.Serializable;
import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Embeddable
public class StudentRegistrationDocumentId implements Serializable {
    @NotNull
    private UUID studentId;
    @NotNull
    private UUID registrationDocumentId;
}
