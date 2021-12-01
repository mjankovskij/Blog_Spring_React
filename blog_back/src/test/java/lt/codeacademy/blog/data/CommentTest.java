package lt.codeacademy.blog.data;

import lt.codeacademy.blog.repository.BlogRepository;
import lt.codeacademy.blog.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import javax.persistence.PersistenceException;
import javax.validation.ConstraintViolationException;

import static org.junit.jupiter.api.Assertions.assertThrows;

@DataJpaTest
class CommentTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BlogRepository blogRepository;

    private User user;
    private Blog blog;

    @BeforeEach
    public void init() {
        User user = new User();
        user.setUsername("useris");
        user.setPassword("12151515153");
        user.setPasswordRepeat("12151515153");
        userRepository.save(user);
        this.user = user;
        Blog blog = new Blog();
        blog.setUser(user);
        blog.setTitle("Pirmas blogas");
        blog.setDescription("Pirmo blogo desciption butu cia jau ir dabar su 50 simboliu minimum.");
        blogRepository.save(blog);
        this.blog = blog;
    }

    @Test
    public void saveValid() {
        Comment comment = new Comment();
        comment.setUser(user);
        comment.setBlog(blog);
        comment.setText("Pirmas komentaras");
        testEntityManager.persist(comment);
        testEntityManager.flush();
    }

    @Test
    public void noUserException() {
        assertThrows(PersistenceException.class, () -> {
            Comment comment = new Comment();
            comment.setBlog(blog);
            comment.setText("Pirmas komentaras");
            testEntityManager.persist(comment);
            testEntityManager.flush();
        });
    }

    @Test
    public void noBlogException() {
        assertThrows(PersistenceException.class, () -> {
            Comment comment = new Comment();
            comment.setUser(user);
            comment.setText("Pirmas komentaras");
            testEntityManager.persist(comment);
            testEntityManager.flush();
        });
    }

    @Test
    public void shortTextException() {
        assertThrows(ConstraintViolationException.class, () -> {
            Comment comment = new Comment();
            comment.setUser(user);
            comment.setBlog(blog);
            comment.setText("Pi");
            testEntityManager.persist(comment);
            testEntityManager.flush();
        });
    }

    @Test
    public void longTextException() {
        assertThrows(ConstraintViolationException.class, () -> {
            Comment comment = new Comment();
            comment.setUser(user);
            comment.setBlog(blog);
            comment.setText("PiriviriliPiriviriliPiriviriliPiriviriliPiriviriliPiriviriliPiriviriliPiriviriliPiriviriliPiriviriliPiriviriliPiriviriliPiriviriliPiriviriliPiriviriliPiriviriliPiriviriliPiriviriliPiriviriliPiriviriliA");
            testEntityManager.persist(comment);
            testEntityManager.flush();
        });
    }

}