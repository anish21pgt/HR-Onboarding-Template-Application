package com.tarento.API.Entity;

import jakarta.persistence.*;
import java.sql.Blob;

@Entity
@Table(name = "image_table")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Lob
    private Blob image;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public Blob getImage() {
        return image;
    }
    public void setImage(Blob image) {
        this.image = image;
    }
}