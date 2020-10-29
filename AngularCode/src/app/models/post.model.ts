import { PostsComments } from './postcomments.model';
import { PostsImages } from './postimages.model';
 
export class PostModel
{
	constructor
	(
		public title: string,
		public subtitle: string,
		public message: string,
		public transmition: string,
		public publishedby: string,
		public comments: Array<PostsComments>,
		public publication_image:string,
		public publication_date: string,
		public images: Array<PostsImages>
	)
	{
	}
}