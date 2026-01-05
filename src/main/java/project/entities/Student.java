// src/main/java/project/entities/Student.java
package project.entities;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("STUDENT")
@Table(name = "students")
public class Student extends User {

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

    // --- Конструкторы ---
    public Student() {
        super();
    }

    public Student(String username, String passwordHash, String firstName, String lastName, String middleName, Integer age, String subject) {
        super(username, passwordHash, Role.STUDENT);
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.age = age;
        this.subject = subject;
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
}