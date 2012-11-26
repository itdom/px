package com.rathink.p.user.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * Time: 15:17:09 2007-8-3
 *
 * @author Kyll
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "P_USERINFO")
public class UserInfo implements Serializable {
	private Integer id;
	private String email;
	private String officePhone;
	private String mobilePhone;

	public UserInfo() {
	}

	@Id
	@GenericGenerator(name = "userInfoId", strategy = "increment")
	@GeneratedValue(generator = "userInfoId")
	public Integer getId() {
		return id;
	}

	@Column(name = "EMAIL")
	public String getEmail() {
		return email;
	}

	@Column(name = "OFFICE_PHONE")
	public String getOfficePhone() {
		return officePhone;
	}

	@Column(name = "MOBILE_PHONE")
	public String getMobilePhone() {
		return mobilePhone;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setOfficePhone(String officePhone) {
		this.officePhone = officePhone;
	}

	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}

		UserInfo userInfo = (UserInfo) o;

		return !(id != null ? !id.equals(userInfo.id) : userInfo.id != null);
	}

	@Override
	public int hashCode() {
		return (id != null ? id.hashCode() : 0);
	}
}
