package justartschool.backend.utils.responses;

import justartschool.backend.utils.errors.BadRequestException;
import justartschool.backend.utils.errors.NotFoundException;
import justartschool.backend.utils.errors.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseUtil {
    public static <T> ResponseEntity<ApiResponse<T>> createSuccessResponse(T data) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setSuccess(true);
        response.setData(data);
        return ResponseEntity.ok(response);
    }

    public static <T> ResponseEntity<ApiResponse<T>> createErrorResponse(String errorMessage, HttpStatus status) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setSuccess(false);
        response.setError(errorMessage);
        return ResponseEntity.status(status).body(response);
    }

    public static <T> ResponseEntity<ApiResponse<T>> createErrorResponse(Exception ex) {
        if (ex instanceof BadRequestException)
            return createErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
        if (ex instanceof NotFoundException)
            return createErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
        if (ex instanceof UnauthorizedException)
            return createErrorResponse(ex.getMessage(), HttpStatus.UNAUTHORIZED);
        return createErrorResponse(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
