package lt.codeacademy.blog.dto;

import lombok.Data;
import lt.codeacademy.blog.entity.Role;
import lt.codeacademy.blog.entity.User;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
public class UserDto {
    private UUID id;
    private String username;
    private Set<String> roles;

    public UserDto(User user) {
        id = user.getId();
        username = user.getUsername();
        roles = user.getRoles().stream().map(Role::getName).collect(Collectors.toSet());
    }
}