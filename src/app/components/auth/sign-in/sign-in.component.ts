import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', hideRequiredMarker: true },
    },
  ],
})
export class SignInComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      // asyncValidators: [(control) => this.isEmailAvailable(control)],
    }),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  public readonly showPassword = signal<boolean>(false);

  public onTogglePasswordVisibility(): void {
    this.showPassword.update((show) => !show);
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.authService
      .signIn(this.form.value.email!, this.form.value.password!)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  public get emailErrorMessage() {
    const emailControl = this.form.controls.email;
    if (emailControl.hasError('required')) {
      return 'Email is required';
    } else if (emailControl.hasError('email')) {
      return 'Invalid email';
    } else if (emailControl.hasError('emailNotAvailable')) {
      return 'Email is not available';
    }
    return '';
  }

  public get passwordErrorMessage() {
    const passwordControl = this.form.controls.password;
    if (passwordControl.hasError('required')) {
      return 'Password is required';
    }
    if (passwordControl.hasError('minlength')) {
      return 'Password must be at least 8 characters';
    }
    return '';
  }

  // private isEmailAvailable(control: AbstractControl<string>) {
  //   return of(control.value).pipe(
  //     delay(500),
  //     distinctUntilChanged(),
  //     switchMap((email) => {
  //       this.emailValidationLoading.set(true);

  //       return this.authService.isEmailAvailable(email).pipe(
  //         map((response) => {
  //           this.emailValidationLoading.set(false);
  //           return response.available ? null : { emailNotAvailable: true };
  //         }),
  //         catchError(() => {
  //           this.emailValidationLoading.set(false);
  //           return of({ emailNotAvailable: true });
  //         })
  //       );
  //     })
  //   );
  // }
}
