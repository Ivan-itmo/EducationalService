package project.entities;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("TEACHER")
@Table(name = "teachers")
public class Teacher extends User {

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "age")
    private Integer age;

    @Column(name = "subject")
    private String subject;

    @Column(name = "degree")
    private String degree; // учёная степень / уровень образования

    // --- Конструкторы ---
    public Teacher() {
        super();
    }

    public Teacher(String username, String passwordHash, String firstName, String lastName, String middleName, Integer age, String subject, String degree) {
        super(username, passwordHash, Role.TEACHER);
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.age = age;
        this.subject = subject;
        this.degree = degree;
    }

    // --- Геттеры и сеттеры ---
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }
}