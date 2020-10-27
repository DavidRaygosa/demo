import { Component, OnInit, ViewChild } from '@angular/core';
//--------------------- SERVICES -----------------------------//
import { GeneralService } from '../../../services/general.service';
import { AdminService } from '../../../services/admins.service';
import { UserService } from '../../../services/user.service';
//--------------------- LIBRARIES ---------------------------//
import { NgAnimateScrollService } from 'ng-animate-scroll';
//--------------------- MODELS -------------------------------//
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
  providers: [GeneralService, AdminService, UserService]
})
export class AdminsComponent implements OnInit {
	//----------- ADMINS -----------
	public admins;
	public rangeAdmins;
	//----------- LOADING ----------
	public loading:boolean;
	//----------- PAGINATION -------
	public NumberofPagination;
	public paginationList;
	public selectedPage:number;
	public selectedListPage:number;
	public viewListPage;
	//---------- CREATE MODAL ------
	public registerError:boolean = false;
	public registerErrorMessage:string;
	public User:User;
	//----------- EDIT MODAL -------
	public Admin:User;
		//----------- DOM --------------
		@ViewChild('nombreAdminEdit') inputEditName;
		@ViewChild('apellidosAdminEdit') inputEditLastname;
		@ViewChild('contraseniaAdminEdit') inputEditPassword;
	//---------- DEGREE MODAL ------
	public IDAdmin;
	//---------- CLOSE MODAL -------
		@ViewChild('registerModal') registerModal;
		@ViewChild('editModal') editModal;
		@ViewChild('closeModal') closeModal;
	constructor
	(
		private _generalService:GeneralService,
		private _animateScrollService: NgAnimateScrollService,
		private _adminService: AdminService,
		private _userService:UserService
	) 
	{ 

	}

	ngOnInit(): void 
	{
		//----------- LOADING ----------
		this.loading = true;
		//----------- GET ADMINS LENGHT ----------
		this.adminsLenght();
	}

	//---------------------------- PAGINATION ---------------------------------------//
	adminsLenght()
	{
		this._generalService.getGeneral().subscribe(
			(response : any) =>
			{
				// SET LOADING TO FALSE (IT WILL SHOW POST CONTENT)
				this.loading = false;
				// GET PAGINATION LENGHT
				this.NumberofPagination = [];
				this.paginationList = [];
				let count = 0;
				for(let i = 0; i < Math.ceil(response.documents[0].adminslenght/5); i++)
				{ 
					count++;
					this.NumberofPagination.push(i+1);
					if(count == 5)
					{
						count=0;
						this.paginationList.push('list');
					}
				}
				// GET, SET AND ACTIVE PAGINATION NUMBER
				this.changePage(1);
				this.setActivePagination(1);
				// SET LIST PAGINATION (ONLY 5 PAGE FOR LIST)
				this.setListPage();
			});
	}

	changePage(numberofPage:number)
	{
		if(numberofPage == 1) this.rangeAdmins = {skip: 0}
		else this.rangeAdmins = {skip: (numberofPage-1)*5}
		this.getAdmins();
	}

	setActivePagination(index: number) 
	{		
		this.selectedListPage = Math.ceil(index/5)-1;
		this.selectedPage = index;
		setTimeout(()=>
		{
			let backButton = document.getElementById("backListButton") as HTMLSelectElement;
			let nextButton = document.getElementById("nextListButton") as HTMLSelectElement;
			this.checkIfDisabledBackListPage(backButton);
			this.checkIfDisabledNextListPage(nextButton);
		},1);
   	}

   	setListPage()
   	{
		this.viewListPage = 
		{
			start: (this.selectedListPage*5),
			end: (this.selectedListPage+1)*5
		}
   	}

   	checkIfDisabledBackListPage(backButton)
   	{
   		if(this.selectedListPage == 0)
   		{
   			backButton.classList.add("disabled");
   		} 
   	}

   	checkIfDisabledNextListPage(nextButton)
   	{
	   	if(this.selectedListPage == Math.ceil(this.paginationList.length)) nextButton.classList.add("disabled");
   	}

   	nextListPage(click = false)
   	{
   		let backButton = document.getElementById("backListButton") as HTMLSelectElement;
   		let nextButton = document.getElementById("nextListButton") as HTMLSelectElement;
   		backButton.classList.remove("disabled");
   		if(click) this.selectedListPage++;
   		this.checkIfDisabledNextListPage(nextButton);
		this.viewListPage = 
		{
			start: (this.selectedListPage*5),
			end: (this.selectedListPage+1)*5
		}
   	}

   	backListPage(click = false)
   	{
   		let backButton = document.getElementById("backListButton") as HTMLSelectElement;
   		let nextButton = document.getElementById("nextListButton") as HTMLSelectElement;
   		nextButton.classList.remove("disabled");
   		if(click) this.selectedListPage--;
   		this.checkIfDisabledBackListPage(backButton);
		this.viewListPage = 
		{
			start: (this.selectedListPage*5),
			end: (this.selectedListPage+1)*5
		}
   	}

	//---------------------------- ADMINS ---------------------------------------//

	getAdmins()
	{
		this._adminService.getAdminsRange(this.rangeAdmins.skip).subscribe((response : any) => this.admins = response.documents);
	}

	//---------------------------- CREATE MODAL ---------------------------------------//

   	onSubmitRegister(form)
   	{
   		this.registerError = false;
   		this.registerErrorMessage = "";
   		this._userService.checkEmail(form.value.registerEmail).subscribe(
   			response =>
   			{
   				if(response.message != 'No Hay Proyectos Para Mostrar') 
   				{
   					this.registerError = true; 
   					this.registerErrorMessage = "Email registrado, por favor intente con otro email";
   					return false;
   				}
				this._userService.checkNickname(form.value.registerNickname.toUpperCase()).subscribe(
				response =>
				{
					if(response.message != 'No Hay Proyectos Para Mostrar') 
					{
						this.registerError = true; 
						this.registerErrorMessage = "Nickname registrado, por favor intente con otro nickname";
						return false;
					}
					this.constructorUser();
					this.registerUser(form);
				});
   			});
   	}

   	constructorUser()
   	{
   		this.User = new User('','','','','','','')
   	}

   	registerUser(form:any)
   	{
   		this.User.name = form.value.registerName;
   		this.User.lastname = form.value.registerLastname;
   		this.User.email = form.value.registerEmail;
   		this.User.password = form.value.registerPassword;
   		this.User.image = 'Null';
   		this.User.usertype = 'admin';
   		this.User.nickname = form.value.registerNickname;
   		this.User.nickname = this.User.nickname.toUpperCase();
   		this._userService.registerUser(this.User).subscribe(
   			response => 
   			{
				// SERVICE CALL GENERAL SETTINGS
				this._generalService.getGeneral().subscribe(
				(response : any) =>
				{
					response.documents[0].adminslenght = (response.documents[0].adminslenght + 1);
					// SERVICE UPDATE GENERAL SETTINGS
					this._generalService.updateGeneral(response.documents[0]).subscribe(
						response=>
						{
							this.closeModals();
							setTimeout(()=>
							{
								this.ngOnInit()
							},300);
						});
				});
   			});
   	}

	//---------------------------- EDIT MODAL ---------------------------------------//

	editAdmin(id)
	{
		this._adminService.getAdminByID(id).subscribe(
			(response : any)=>
			{
				this.Admin = response.document;
				this.inputEditName.nativeElement.value = this.Admin.name;
				this.inputEditLastname.nativeElement.value = this.Admin.lastname;
				this.inputEditPassword.nativeElement.value = this.Admin.password;
			});
	}

	updateAdmin()
	{
		this.Admin.name = this.inputEditName.nativeElement.value;
		this.Admin.lastname = this.inputEditLastname.nativeElement.value;
		this.Admin.password = this.inputEditPassword.nativeElement.value;
		this._userService.updateUser(this.Admin).subscribe(response => {this.closeModals();this.getAdmins()});
	}

	//---------------------------- DEGREE MODAL ---------------------------------------//

	getDegreeAdmin(id)
	{
		this.IDAdmin = id;
	}

	degreeAdmin()
	{
		// SERVICE CALL ADMIN BY ID
		this._adminService.getAdminByID(this.IDAdmin).subscribe(
			(response : any)=>
			{
				this.Admin = response.document;
				this.Admin.usertype = "standard";
				// SERVICE UPDATE ADMIN BY ID
				this._userService.updateUser(this.Admin).subscribe();
				// SERVICE CALL GENERAL SETTINGS
				this._generalService.getGeneral().subscribe(
				(response : any) =>
				{
					response.documents[0].adminslenght = (response.documents[0].adminslenght - 1);
					response.documents[0].userslenght = (response.documents[0].userslenght + 1);
					// SERVICE UPDATE GENERAL SETTINGS
					this._generalService.updateGeneral(response.documents[0]).subscribe(
						response=>
						{
							this.closeModals();
							setTimeout(()=>
							{
								this.ngOnInit()
							},300);
						});
				});
			});
	}

	//---------------------------- CLOSE MODAL ---------------------------------------//

   	closeModals()
   	{
   		setTimeout(()=>
   		{
   			this.registerModal.nativeElement.click();
			this.editModal.nativeElement.click();
			this.closeModal.nativeElement.click();
   		},10);
   	}
}
