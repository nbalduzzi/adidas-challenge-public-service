import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class SubscriptionDTO {
  @ApiProperty({
    description: 'The subscription ID',
    type: String,
    required: false,
  })
  id?: string;

  @ApiProperty({
    description: 'The subscriptor email',
    type: String,
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'The subscriptor first name',
    type: String,
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    description: 'The subscriptor gender',
    type: String,
    required: false,
  })
  gender?: string;

  @ApiProperty({
    description: 'The subscriptor date of birth',
    type: Number,
    required: true,
  })
  dateOfBirth: number;

  @ApiProperty({
    description: 'The subscriptor consent flag',
    type: Boolean,
    required: true,
    default: false,
  })
  consent: boolean;

  @ApiProperty({
    description: 'The subscriptor newsletter campaign id',
    type: String,
    required: true,
  })
  newsletterId: string;
}

export class CreateSubscriptionDTO extends OmitType(SubscriptionDTO, ['id']) {}
