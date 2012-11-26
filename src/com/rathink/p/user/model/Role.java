package com.rathink.p.user.model;

import org.springframework.security.core.GrantedAuthority;

public class Role implements GrantedAuthority {
	private static final long serialVersionUID = 1L;
	private String name;
	private String fullName;           //对应roles.mxl中的roles.role.label
	private String description;
	private Float price;
	private Integer sort;
	private String related;           //对应roles.mxl中的roles.role.branchType
    private String module;
    private String label;
    private String branchType;
    public String getName(){
		return name;
	}

    public void setName(String name) {
		this.name = name;
	}

	public String getFullName() {
		return fullName;
	}

    public void setFullName(String fullName) {
		this.fullName = fullName;
	}

    public void setDescription(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public Float getPrice() {
		return price;
	}

	public void setPrice(Float price) {
		this.price = price;
	}

	public Integer getSort() {
		return sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}

	public String getRelated() {
		return related;
	}

	public void setRelated(String related) {
		this.related = related;
	}

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getBranchType() {
        return branchType;
    }

    public void setBranchType(String branchType) {
        this.branchType = branchType;
    }

    public String getAuthority() {
		return getName();
	}

    /*@Override
    public int compareTo(Object o) {
        return 0;
    }*/

}
