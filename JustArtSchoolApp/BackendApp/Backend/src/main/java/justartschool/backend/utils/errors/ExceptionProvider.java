package justartschool.backend.utils.errors;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ExceptionProvider {
    public BadRequestException BAD_REQUEST_EXCEPTION(String message) {
        return new BadRequestException(message);
    }

    public NotFoundException NOT_FOUND_EXCEPTION(String message) {
        return new NotFoundException(message);
    }

    public UnauthorizedException UNAUTHORIZED_EXCEPTION(String message) {
        return new UnauthorizedException(message);
    }
}
