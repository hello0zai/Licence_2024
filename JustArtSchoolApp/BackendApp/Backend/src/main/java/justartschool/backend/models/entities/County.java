package justartschool.backend.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.*;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "county")
public class County {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID countyId;
    @Column
    private String countyName;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "countryId")
    private Country country;

    @JsonIgnore
    @OneToMany(mappedBy = "county", cascade = {CascadeType.ALL})
    List<City> cities = new ArrayList<City>();
}