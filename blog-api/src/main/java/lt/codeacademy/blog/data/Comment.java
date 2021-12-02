package lt.codeacademy.blog.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;

import javax.validation.constraints.*;
import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Setter
@Getter
@Entity
@NoArgsConstructor
@Table(name = "Comments")
public class Comment {
    @Id
    @GeneratedValue
    @NotNull
    @Column(columnDefinition = "VARCHAR(36)", updatable = false)
    @Type(type="uuid-char")
    private UUID id;
    @NotNull
    @NotBlank
    @Column(columnDefinition="TEXT", nullable = false)
    @Size(min = 3, max = 200)
    private String text;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false, updatable=false)
    private Date datetime;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "blog_id", nullable = false, updatable = false)
    private Blog blog;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private User user;
}