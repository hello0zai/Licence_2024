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
@Table(name = "country")
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID countryId;
    @Column
    private String countryName;
    @Column
    private String phoneCode;
    @Column
    private String countrySymbol;

    @JsonIgnore
    @OneToMany(mappedBy = "country", cascade = {CascadeType.ALL})
    List<County> counties = new ArrayList<County>();
}