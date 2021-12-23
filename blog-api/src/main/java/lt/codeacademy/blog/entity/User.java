package lt.codeacademy.blog.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.codeacademy.blog.validator.annotation.PasswordMatch;
import lt.codeacademy.blog.validator.annotation.UniqueUsername;
import org.hibernate.annotations.Type;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Set;
import java.util.UUID;

@Setter
@Getter
@Entity
@NoArgsConstructor
@PasswordMatch
@Table(name = "Users",uniqueConstraints = { @UniqueConstraint(columnNames = { "username" }) })
public class User implements UserDetails {
    @Id
    @GeneratedValue
    @NotNull
    @Column(columnDefinition = "VARCHAR(36)", updatable = false)
    @Type(type="uuid-char")
    private UUID id;
    @NotNull
    @NotBlank(message="{lt.blog.notBlank}")
    @UniqueUsername
    @Size(min = 3, max = 20, message="{lt.blog.minMaxUsername}")
    private String username;
    @NotNull
    @NotBlank(message="{lt.blog.notBlank}")
    @Size(min = 8, message = "{lt.blog.minSizePassword}")
    private String password;
    @Transient
    @NotBlank(message="{lt.blog.repeatPassword}")
    private String passwordRepeat;

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

    @JsonIgnore
    public String getPasswordRepeat() {
        return passwordRepeat;
    }

    @JsonProperty
    public void setPasswordRepeat(String passwordRepeat) {
        this.passwordRepeat = passwordRepeat;
    }

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Set<Blog> blogs;

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Set<Comment> comments;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Role> roles;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}