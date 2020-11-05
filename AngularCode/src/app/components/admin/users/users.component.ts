import { Component, OnInit, ViewChild } from '@angular/core';
//--------------------- SERVICES -----------------------------//
import { GeneralService } from '../../../services/general.service';
import { UserService } from '../../../services/user.service';
//--------------------- MODELS -------------------------------//
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [GeneralService, UserService]
})
export class UsersComponent implements OnInit {
	//----------- LOADING ----------
	public loading:boolean;
	//----------- PAGINATION -------
	public NumberofPagination;
	public paginationList;
	public selectedPage:number;
	public selectedListPage:number;
	public viewListPage;
	//----------- USERS -----------
	public users;
	public User:User;
	public rangeUsers;
	//---------- CREATE MODAL ------
	public registerError:boolean = false;
	public registerErrorMessage:string;
	//--------- UPDATE MODAL --------
	@ViewChild('editName') editName;
	@ViewChild('editLastname') editLastname;
	@ViewChild('editPassword') editPassword;
	//--------- UPGRADE MODAL --------
	public IDUser;
	//--------- CLOSE MODAL --------
	@ViewChild('registerModal') registerModal;
	@ViewChild('editModal') editModal;
	@ViewChild('upgradeModal') upgradeModal;
	@ViewChild('deleteModal') deleteModal;
	//--------- SEARCH MODAL --------
	@ViewChild('searchInput') searchInput;
	@ViewChild('closeSearch') closeSearch;
	public searchBorderColor;
	public enableSearch:boolean = false;
	public search;

	constructor
	(
		private _generalService:GeneralService,
		private _userService:UserService
	) 
	{ 

	}

	ngOnInit(): void 
	{
		//----------- LOADING ----------
		this.loading = true;
		//----------- GET ADMINS LENGHT ----------
		this.usersLenght();
	}

	//---------------------------- PAGINATION ---------------------------------------//
	usersLenght()
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
				for(let i = 0; i < Math.ceil(response.documents[0].userslenght/10); i++)
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
		if(numberofPage == 1) this.rangeUsers = {skip: 0}
		else this.rangeUsers = {skip: (numberofPage-1)*10}
		this.getUsers();
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

	getUsers()
	{
		this._userService.getUsersRange(this.rangeUsers.skip).subscribe((response : any) => this.users = response.documents);
	}

	getUserID(id)
	{
		this.closeSearch.nativeElement.click();
		this.IDUser = id;
	}

	//---------------------------- UPDATE MODAL ---------------------------------------//

	getUserIDEdit(id)
	{
		this.closeSearch.nativeElement.click();
		this._userService.getUserByID(id).subscribe(
			(response : any)=>
			{
				this.User = response.document;
				this.editName.nativeElement.value = this.User.name;
				this.editLastname.nativeElement.value = this.User.lastname;
				this.editPassword.nativeElement.value = this.User.password;
			});
	}

	updateUser()
	{
		this.User.name = this.editName.nativeElement.value;
		this.User.lastname = this.editLastname.nativeElement.value;
		this.User.password = this.editPassword.nativeElement.value;
		this._userService.updateUser(this.User).subscribe(response => {this.closeModals();this.getUsers()});
	}

	//---------------------------- UPGRADE MODAL ---------------------------------------//

	upgrade()
	{
		// SERVICE CALL USER BY ID
		this._userService.getUserByID(this.IDUser).subscribe(
			(response : any) =>
			{
				this.User = response.document;
				this.User.usertype = "admin";
				// SERVICE UPDATE USER BY ID
				this._userService.updateUser(this.User).subscribe();
				// SERVICE CALL GENERAL SETTINGS
				this._generalService.getGeneral().subscribe(
				(response : any) =>
				{
					response.documents[0].adminslenght = (response.documents[0].adminslenght + 1);
					response.documents[0].userslenght = (response.documents[0].userslenght - 1);
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

	//---------------------------- DELETE MODAL ---------------------------------------//

	delete()
	{
		// SERVICE DELETE USER BY ID
		this._userService.deleteUser(this.IDUser).subscribe(
			reseponse =>
			{
				// SERVICE CALL GENERAL SETTINGS
				this._generalService.getGeneral().subscribe(
				(response : any) =>
				{
					response.documents[0].userslenght = (response.documents[0].userslenght - 1);
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

	//---------------------------- REGISTER MODAL ---------------------------------------//

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
   		this.User.usertype = 'standard';
   		this.User.nickname = form.value.registerNickname;
   		this.User.nickname = this.User.nickname.toUpperCase();
   		this._userService.registerUser(this.User).subscribe(
   			response => 
   			{
				// SERVICE CALL GENERAL SETTINGS
				this._generalService.getGeneral().subscribe(
				(response : any) =>
				{
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

   	//---------------------------- SEARCH MODAL ---------------------------------------//

   	searchUser()
   	{
   		this.searchBorderColor = 'none';
   		this.enableSearch = false;
   		if(this.searchInput.nativeElement.value == '') this.searchBorderColor = '1px solid red';
   		else 
   		{
   			this._userService.checkEmail(this.searchInput.nativeElement.value).subscribe(
   				(response : any) =>
   				{
   					if(response.message != 'No Hay Proyectos Para Mostrar') {this.search = response.documents[0];this.enableSearch = true;}
   					else
   					{
   						this._userService.checkNickname(this.searchInput.nativeElement.value.toUpperCase()).subscribe(
   							response =>
   							{
   								if(response.message != 'No Hay Proyectos Para Mostrar') {this.search = response.documents[0];this.enableSearch = true;}
   							});
   					}
   				});
   		}
   	}

	//---------------------------- CLOSE MODAL ---------------------------------------//

   	closeModals()
   	{
   		setTimeout(()=>
   		{
   			this.registerModal.nativeElement.click();
   			this.editModal.nativeElement.click();
			this.upgradeModal.nativeElement.click();
			this.deleteModal.nativeElement.click();
   		},10);
   	}
}
