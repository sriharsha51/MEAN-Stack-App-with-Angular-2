import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  messageClass;
  message;
  newPost: boolean = false;
  loadingBlogs: boolean = false;
  form;
  processing: boolean = false;
  username: string;
  blogPosts;

  constructor( private formBuilder: FormBuilder,
               private authService: AuthService,
               private blogService: BlogService ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required,Validators.maxLength(50),
                   Validators.minLength(5), this.alphaNumericValidation]],
      body: ['', [Validators.required, Validators.maxLength(500),
                    Validators.minLength(5)]]             
    });
     
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
    });

    this.getAllBlogs();//to load blogs as soon as the page loads.

  }

  enableFormNewBlogForm() {
    this.form.get('title').enable();
    this.form.get('body').enable();
  }

  disableFormNewBlogForm() {
    this.form.get('title').disable();
    this.form.get('body').disable();
  }

  alphaNumericValidation(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/); // Regular expression to perform test
    // Check if test returns false or true
    if (regExp.test(controls.value)) {
      return null; // Return valid
    } else {
      return {'alphaNumericValidation': true } // Return error in validation
    }
  }

  newBlogForm() {
    this.newPost = true; 
  }

  reloadBlogs() {
    this.loadingBlogs = true;
    this.getAllBlogs();
    setTimeout(() => {
      this.loadingBlogs = false;
    }, 2000)//just to restrict user to click reload many times in succession so that requests will not go to backend
  }

  draftComment() {
    
  }

  onBlogSubmit() {
    this.processing = true;
    this.disableFormNewBlogForm();
     
    const blog = {
      title: this.form.get('title').value,
      body: this.form.get('body').value,
      createdBy: this.username
    }

    this.blogService.newBlog(blog).subscribe(data => {
      if(!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableFormNewBlogForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.getAllBlogs();
        setTimeout(() => {
          this.newPost = false;
          this.processing = false;
          this.message = false;
          this.form.reset();
          this.enableFormNewBlogForm();
        }, 1000)
      }
    })

  }

  goBack() {
    window.location.reload();
  }

  getAllBlogs(){
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogPosts = data.blogs;
    })
  }


}
