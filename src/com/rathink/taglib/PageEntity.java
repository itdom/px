package com.rathink.taglib;

import com.rathink.util.AuthorizationUtil;

public class PageEntity {
    public PageEntity(){
          this.xmlRecords=Integer.parseInt(AuthorizationUtil.getAuthorization().getSettingValue("pageRecords"));
          this.pageRecords = xmlRecords;
    }
    private int pageIndex = 1;
	private int pageRecords = 15;
	private int pageCount;
	private int recordCount;
	private int recordIndex;
	private int pageStep = 10;
	private int pageStepStart;
	private int pageStepEnd;
	
	private int nextPage;
	private int previousPage;
	private int nnextPage;
	private int ppreviousPage;
	private int xmlRecords=0;
	static String PARAM_NAME_PAGEINDEX = "pageEntity.pageIndex";
	static String PARAM_NAME_PAGERECORDS = "pageEntity.pageRecords";
	static String PARAM_NAME_PAGESTEP = "pageEntity.pageStep";

	public int getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public int getPageRecords() {
		return pageRecords;
	}

	public void setPageRecords(int pageRecords) {
		this.pageRecords = pageRecords;
	}

	public synchronized int getPageCount() {
        //if(this.xmlRecords!=0)this.pageRecords=this.xmlRecords;
		this.pageCount = this.recordCount % this.pageRecords == 0 ? this.recordCount / this.pageRecords: this.recordCount / this.pageRecords+ 1;
		return pageCount;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}

	public int getRecordCount() {
		return recordCount;
	}

	public void setRecordCount(int recordCount) {
		this.recordCount = recordCount;
	}

	public synchronized int getRecordIndex() {
       // if(this.xmlRecords!=0)this.pageRecords=this.xmlRecords;
		this.recordIndex = this.pageIndex == 0 ? 1 : (this.pageIndex - 1) * this.pageRecords;
		return recordIndex;
	}

	public int getPageStep() {
		return pageStep;
	}

	public void setPageStep(int pageStep) {
		this.pageStep = pageStep;
	}

	public synchronized int getPageStepStart() {
		int start = this.pageIndex % this.pageStep == 0 ? this.pageIndex / this.pageStep : this.pageIndex / this.pageStep + 1;
		this.pageStepStart = start == 1 ? 1 : start * this.pageStep - this.pageStep + 1;
		return pageStepStart;
	}

	public synchronized int getPageStepEnd() {
		if (this.pageCount > this.pageStep) {
			if (this.pageIndex == this.pageCount) {
				this.pageStepEnd = this.pageStepStart + this.pageCount % this.pageStep;
			} else {
				this.pageStepEnd = this.pageCount - this.pageStepStart < this.pageCount % this.pageStep ? this.pageCount + 1 : this.pageStepStart + this.pageStep;
			}
		} else {
			this.pageStepEnd = this.pageCount + 1;
		}
		return pageStepEnd;
	}

	public synchronized int getNextPage() {
		this.nextPage = this.pageIndex == this.pageCount ? this.pageCount : this.pageIndex + 1;
		return nextPage;
	}

	public synchronized int getPreviousPage() {
		this.previousPage = this.pageIndex == 1 ? 1 : this.pageIndex - 1;
		return previousPage;
	}

	public synchronized int getNnextPage() {
        if(this.pageIndex + this.pageStep > this.pageCount){
           if(this.pageStepEnd > this.pageCount)this.nnextPage = this.pageIndex;
           else this.nnextPage =this.pageStepEnd;
        }else{
            if(this.pageIndex + this.pageIndex % this.pageStep == 0)this.nnextPage=this.pageIndex;
            else this.nnextPage =this.pageIndex +(this.pageStep-this.pageIndex%this.pageStep+1);
        }
		return nnextPage;
	}
	public synchronized int getPpreviousPage() {
		this.ppreviousPage = this.pageIndex > this.pageStep ? this.pageIndex - this.pageStep - this.pageIndex % this.pageStep + 1 : 1;
		return ppreviousPage;
	}
	
}
