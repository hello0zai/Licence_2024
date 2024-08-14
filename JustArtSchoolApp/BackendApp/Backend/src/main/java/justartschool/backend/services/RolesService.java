package justartschool.backend.services;

import justartschool.backend.dtos.RoleDto;
import justartschool.backend.models.entities.Role;
import justartschool.backend.repositories.IRolesRepository;
import justartschool.backend.utils.errors.BadRequestException;
import justartschool.backend.utils.errors.ExceptionProvider;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class RolesService {
    private final ExceptionProvider exceptionProvider;
    private final IRolesRepository repository;
    private final ModelMapper modelMapper;

    public UUID getRoleByName(RoleDto roleDto) {
        String roleName = roleDto.getName();
        Role role = repository.getRoleByName(roleName);
        return role.getRoleId();
    }

    public void addRole(RoleDto roleDto) throws BadRequestException {
        if (roleDto == null)
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("Role is required");
        Role role = modelMapper.map(roleDto, Role.class);
        repository.save(role);
    }

    public Role getRoleById(UUID roleId) {
        return repository.getRoleByRoleId(roleId);
    }

    public Role getRoleByNameOrSaveRole(RoleDto roleDto) {
        String roleName = roleDto.getName();
        Role role = repository.getRoleByName(roleName);
        if (role == null) {
            role = modelMapper.map(roleDto, Role.class);
            repository.save(role);
        }
        return role;
    }

    public List<RoleDto> getAllRoles() {
        List<Role> roles = repository.findAll();
        return roles.stream().map(RoleDto::new).toList();
    }
}
