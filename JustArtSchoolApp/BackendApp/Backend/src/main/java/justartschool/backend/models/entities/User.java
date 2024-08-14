package justartschool.backend.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Entity
@Table(name = "user")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID userId;
    @Column
    private String email;
    @Column
    private String userName;

    @Column
    private String password;

    @Column
    private Boolean accountNonExpired;

    @Column
    private Boolean accountNonLocked;

    @Column
    private Boolean credentialsNonExpired;

    @Column
    private boolean enabled;

    @Lob
    @Column(length = 10000000)
    private byte[] profilePicture = new byte[10000000];

    @Column
    private String profilePictureTypeFile;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Collection<Role> roles = new ArrayList<Role>();

    @JsonIgnore
    @OneToMany(mappedBy = "user",cascade = {CascadeType.ALL})
    private List<AdmissionContestTask> admissionContestTaskList = new ArrayList<>();
}
