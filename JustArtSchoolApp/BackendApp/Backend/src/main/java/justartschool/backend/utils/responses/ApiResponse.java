package justartschool.backend.utils.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data

public class ApiResponse<T> {
    private boolean success;
    private T data;
    private String error;
}