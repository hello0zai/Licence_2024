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
@Table(name = "city")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID cityId;

    @Column
    private String cityName;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "countyId")
    County county;

    @JsonIgnore
    @OneToMany(mappedBy = "city", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    List<Secretary> secretaries = new ArrayList<Secretary>();
}