import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, timer } from 'rxjs';
import { Location } from '@angular/common';

import { TalentService } from 'src/app/services/talent-service/talent.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Talent } from 'src/app/models/talent';


@Component({
  selector: 'app-talent-form',
  templateUrl: './talent-form.component.html',
  styleUrls: ['./talent-form.component.scss']
})
export class TalentFormComponent implements OnInit {

  talent: Talent;
  form: FormGroup;
  isSubmited: boolean = false;
  imageDisplay: string | ArrayBuffer;
  editmode = false
  currentTalentid: string;
  endsubs$: Subject<any> = new Subject();

  constructor(private formBuilder: FormBuilder, private talentService: TalentService, private route: ActivatedRoute, private messageService: MessageService, private location: Location, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
       name:['', Validators.required],
       height:['', Validators.required],
       bust:['', Validators.required],
       waist:['', Validators.required],
       hips:['', Validators.required],
       dress:['', Validators.required],
       shoe:['', Validators.required],
       hair:['', Validators.required],
       eyes:['', Validators.required],
       image: ['']
    });

    this.currentTalentid = this.route.snapshot.paramMap.get("id")
    this._checkEditMode();
  }

  private _addTalent(talentFormData: FormData) {
    this.talentService
    .createTalent(talentFormData)
    .pipe(takeUntil(this.endsubs$))
    .subscribe(
      (talent: Talent) => {
        this.messageService.add({
          severity: 'success',
            summary: 'Success',
            detail: `Talent ${talent.name} is created!`
          });
          timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Talent is not created!'
          });
        }
        );
      }

       _deleteTalent(talentId: string) {
        this.confirmationService.confirm({
          message: 'Do you want to delete this Talent?',
          header: 'Delete Talent',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.talentService
              .deleteTalent(talentId)
              .pipe(takeUntil(this.endsubs$))
              .subscribe(
                () => {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Talent is deleted!'
                  });
                  timer(2000)
                  .toPromise()
                  .then(() => {
                    this.location.back();
                  });
                },
                () => {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Talent is not deleted!'
                  });
                }
              );
          }
        });
      }
      
      private _updateTalent(talentFormData: FormData) {
        this.talentService
        .updateTalent(talentFormData, this.currentTalentid)
        .pipe(takeUntil(this.endsubs$))
        .subscribe(
          (talent: Talent) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Talent ${talent.name} is updated!`
            });
            timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Talent is not updated!'
            });
          }
          );
        }


        private _checkEditMode(){
          this.route.params.subscribe((params) => {
            if(params['id']){
              this.editmode = true
              this.currentTalentid = params['id']
              this.talentService.getTalent(params['id']).subscribe((talent) => {
                this.talentForm['name'].setValue(talent.name)
                this.talentForm['height'].setValue(talent.height)
                this.talentForm['bust'].setValue(talent.bust)
                this.talentForm['waist'].setValue(talent.waist)
                this.talentForm['hips'].setValue(talent.hips)
                this.talentForm['dress'].setValue(talent.dress)
                this.talentForm['shoe'].setValue(talent.shoe)
                this.talentForm['hair'].setValue(talent.hair)
                this.talentForm['eyes'].setValue(talent.eyes)          
                this.imageDisplay = talent.image       
                ;
                
              })
            }
          })
        }
        
        onSubmit(){
          this.isSubmited = true
      
          if(this.form.invalid){
            return
          }
      
          const talentFormData = new FormData();
          Object.keys(this.talentForm).map((key) => {
            talentFormData.append(key, this.talentForm[key].value);
          });
      
          if(this.editmode){
            this._updateTalent(talentFormData)
          } else {
            this._addTalent(talentFormData);
          }
        }
        
        

    onImageUpload(event) {
    const file = event.target.files[0];
    if(file){
      this.form.patchValue({ image: file});
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file)
    }
  }

  get talentForm(){
    return this.form.controls
  }

    
}
