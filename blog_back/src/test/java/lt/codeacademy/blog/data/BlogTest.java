package lt.codeacademy.blog.data;

import lt.codeacademy.blog.repository.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import javax.persistence.PersistenceException;
import javax.validation.ConstraintViolationException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DataJpaTest
class BlogTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private UserRepository userRepository;

    private User user;

    @BeforeEach
    public void init() {
        User user = new User();
        user.setUsername("useris");
        user.setPassword("12151515153");
        user.setPasswordRepeat("12151515153");
        userRepository.save(user);
        this.user = user;
    }

    @Test
    public void saveValid() {
        Blog blog = new Blog();
        blog.setUser(user);
        blog.setTitle("Pirmas blogas");
        blog.setDescription("Pirmo blogo desciption butu cia jau ir dabar su 50 simboliu minimum.");
        testEntityManager.persist(blog);
        testEntityManager.flush();
    }

    @Test
    public void noUserException() {
        assertThrows(PersistenceException.class, () -> {
            Blog blog = new Blog();
            blog.setTitle("Pirmas blogas");
            blog.setDescription("Pirmo blogo desciption butu cia jau ir dabar su 50 simboliu minimum.");
            testEntityManager.persist(blog);
            testEntityManager.flush();
        });
    }

    @Test
    public void shortTitleException() {
        assertThrows(ConstraintViolationException.class, () -> {
            Blog blog = new Blog();
            blog.setUser(user);
            blog.setTitle("Pi");
            blog.setDescription("Pirmo blogo desciption butu cia jau ir dabar su 50 simboliu minimum.");
            testEntityManager.persist(blog);
            testEntityManager.flush();
        });
    }

    @Test
    public void longTitleException() {
        assertThrows(ConstraintViolationException.class, () -> {
            Blog blog = new Blog();
            blog.setUser(user);
            blog.setTitle("Pirmas blogas.Pirmas blogas.Pirmas blogas.Pirmas blogas.Pirmas blogas.Pirmas blogas.Pirmas blogas.Pirmas blogas.");
            blog.setDescription("Pirmo blogo desciption butu cia jau ir dabar su 50 simboliu minimum.");
            testEntityManager.persist(blog);
            testEntityManager.flush();
        });
    }

    @Test
    public void nullTitleException() {
        assertThrows(ConstraintViolationException.class, () -> {
            Blog blog = new Blog();
            blog.setUser(user);
            blog.setDescription("Pirmo blogo desciption butu cia jau ir dabar su 50 simboliu minimum.");
            testEntityManager.persist(blog);
            testEntityManager.flush();
        });
    }

    @Test
    public void shortDescriptionException() {
        assertThrows(ConstraintViolationException.class, () -> {
            Blog blog = new Blog();
            blog.setUser(user);
            blog.setTitle("Pirmas blogas");
            blog.setDescription("Pirmo blogo desc.");
            testEntityManager.persist(blog);
            testEntityManager.flush();
        });
    }

    @Test
    public void nullDescriptionException() {
        assertThrows(ConstraintViolationException.class, () -> {
            Blog blog = new Blog();
            blog.setUser(user);
            blog.setTitle("Pirmas blogas");
            testEntityManager.persist(blog);
            testEntityManager.flush();
        });
    }
}