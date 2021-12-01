package lt.codeacademy.blog.data;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.codeacademy.blog.validator.annotation.PasswordMatch;
import lt.codeacademy.blog.validator.annotation.UniqueUsername;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;
import java.util.UUID;

@Setter
@Getter
@Entity
@NoArgsConstructor
@PasswordMatch
@Table(name = "Users",uniqueConstraints = { @UniqueConstraint(columnNames = { "username" }) })
public class User {
    @Id
    @GeneratedValue
    @NotNull
    @Column(columnDefinition = "VARCHAR(36)", updatable = false)
    @Type(type="uuid-char")
    private UUID id;
    @NotNull
    @NotBlank
    @UniqueUsername
    @Size(min = 3, max = 20)
    private String username;
    @NotNull
    @NotBlank
    @Size(min = 8, message = "Password should have min 8 characters")
    private String password;
    @Transient
    @NotBlank
    private String passwordRepeat;

//    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
//    private Set<Blog> blogs;

//    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
//    private Set<Comment> comments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Role> roles;

}