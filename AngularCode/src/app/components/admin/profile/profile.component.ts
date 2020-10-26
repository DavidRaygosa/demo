import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; // Import Router From Angular
//--------------------- MODELS -------------------------------//
import { User } from '../../../models/user.model';
//--------------------- SERVICES -------------------------------//
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {

	//----------- LOADING ----------
	public loading:boolean;
	//----------- EDIT -------------
	public edit:boolean;
	//---------- SESSION -----------
	public _SESSION:User;
	//----------- DOM --------------
	@ViewChild('nombreAdminEdit') inputName;
	@ViewChild('apellidosAdminEdit') inputLastname;
	@ViewChild('nicknameAdminEdit') inputnNickname;
	@ViewChild('emailAdminEdit') inputEmail;
	@ViewChild('contraseniaAdminEdit') inputPassword;

	constructor(private router:Router, private _userService:UserService) 
	{

	}

	ngOnInit(): void 
	{
		//----------- LOADING ----------
		this.loading = true;
		//----------. EDIT -------------
		this.edit = true;
		//---------- SESSION -----------
		this.getSession();
		this.setData();
	}

	//---------------------------- SESSION ---------------------------------------//

	getSession()
	{
		this._SESSION = JSON.parse(localStorage.getItem('_SESSION'));
		if(this._SESSION != null) this.loading = false;
	}

	setData()
	{
		setTimeout(()=>
		{
			if(this._SESSION != null)
			{
				this.inputName.nativeElement.value = this._SESSION.name;
				this.inputLastname.nativeElement.value = this._SESSION.lastname;
				this.inputnNickname.nativeElement.value = this._SESSION.nickname;
				this.inputEmail.nativeElement.value = this._SESSION.email;
				this.inputPassword.nativeElement.value = this._SESSION.password;
			}
		},1);
	}

	//---------------------------- EDIT ---------------------------------------//

	enableEdit()
	{
		this.edit = false;
		this.inputName.nativeElement.value = "";
		this.inputLastname.nativeElement.value = "";
		this.inputPassword.nativeElement.value = "";
	}

	//------------------------- CLOSE SESSION ---------------------------------------//

	closeAdminPanel()
	{
		localStorage.clear();
		this.router.navigateByUrl('/');
		setTimeout(()=>
		{
			window.location.reload();
		},1)
	}

	//---------------------------- SAVE ---------------------------------------//

	saveChanges()
	{
		this._SESSION.name = this.inputName.nativeElement.value;
		this._SESSION.lastname = this.inputLastname.nativeElement.value;
		this._SESSION.nickname = this.inputnNickname.nativeElement.value;
		this._SESSION.email = this.inputEmail.nativeElement.value;
		this._SESSION.password = this.inputPassword.nativeElement.value;
		this._userService.updateUser(this._SESSION).subscribe(response => {this.changeLocalStorage();this.ngOnInit();});
	}

	changeLocalStorage()
	{
		localStorage.clear();
		localStorage.setItem('_SESSION', JSON.stringify(this._SESSION));
	}

	//---------------------------- CANCEL ---------------------------------------//

	cancel()
	{
		this.edit = true;
		this.inputName.nativeElement.value = this._SESSION.name;
		this.inputLastname.nativeElement.value = this._SESSION.lastname;
		this.inputPassword.nativeElement.value = this._SESSION.password;
	}
}
