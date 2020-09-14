export class Student
{
	constructor
	(
		// PERSONAL DATA PANEL

		public name: string,
		public lastname: string,
		public lastnamem:string,
		public birthday:string,
		public tel:string,
		public teloffice:string,
		public cellphone:string,
		public avaible_from:string,
		public avaible_to:string,
		public email:string,

		// PERSONAL ADDRESS PANEL

		public street:string,
		public numberhouse:string,
		public colonia:string,
		public cp:string,
		public municipio:string,
		public state:string,

		// PERSONAL ADDRESS PANEL

		public carreracursada:string,
		public school:string,
		public status:string,
		public semestresconcluidos:string,
		public speciality:string,
		public secondcarrera:string,
		public secondcarrera_specify:string,
		public secondcarrera_school:string,
		public secondcarrera_titulado:string
	)
	{
	}
}