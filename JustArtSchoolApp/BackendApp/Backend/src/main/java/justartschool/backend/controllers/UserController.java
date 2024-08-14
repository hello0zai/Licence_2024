package justartschool.backend.controllers;

import justartschool.backend.authentication.ArtSchoolUserDetails;
import justartschool.backend.dtos.UserAccount;
import justartschool.backend.services.ArtSchoolUserDetailsService;
import justartschool.backend.utils.responses.ApiResponse;
import justartschool.backend.utils.responses.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final ArtSchoolUserDetailsService service;

    public UserController(ArtSchoolUserDetailsService service) {
        this.service = service;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_SECRETARY', 'ROLE_TEACHER', 'ROLE_STUDENT')")
    @GetMapping("/getByEmail/email={email}")
    public ResponseEntity<ApiResponse<UserAccount>> getUserByEmail(@PathVariable("email") String email,
                                                                   @AuthenticationPrincipal ArtSchoolUserDetails currentUser) {
        try {
            UserAccount result = service.getUserByEmail(email, currentUser);
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_SECRETARY','ROLE_TEACHER', 'ROLE_STUDENT')")
    @PutMapping("/edit")
    public ResponseEntity<ApiResponse<String>> editUser(@RequestBody UserAccount userAccount,
                                                        @AuthenticationPrincipal ArtSchoolUserDetails currentUser) {
        try {
            service.edit(userAccount, currentUser);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }
}
