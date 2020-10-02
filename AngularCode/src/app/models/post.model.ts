import { PostsComments } from './postcomments.model';
 
export class PostModel
{
	constructor
	(
		// Group Data Info

		public title: string,
		public subtitle: string,
		public message: string,
		public comments: Array<PostsComments>,
		public publication_image:string,
		public publication_date: string
	)
	{
	}
}