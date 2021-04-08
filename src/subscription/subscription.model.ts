import { ApiProperty, OmitType } from '@nestjs/swagger';

export class SubscriptionDTO {
  @ApiProperty({
    description: 'The subscription ID',
    type: String,
    required: false,
    example: '307136a8-6607-45d8-8d5a-144be75eabe0',
  })
  id?: string;

  @ApiProperty({
    description: 'The subscriptor email',
    type: String,
    required: true,
    example: 'jhon.doe@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'The subscriptor first name',
    type: String,
    required: false,
    example: 'jhon',
  })
  firstName?: string;

  @ApiProperty({
    description: 'The subscriptor gender',
    type: String,
    required: false,
    example: 'Male',
  })
  gender?: string;

  @ApiProperty({
    description: 'The subscriptor date of birth',
    type: String,
    required: true,
    example: '1986-12-28T00:00:00.000Z',
  })
  dateOfBirth: string;

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
    example: 'shoes_campaign_id',
  })
  newsletterId: string;
}

export class CreateSubscriptionDTO extends OmitType(SubscriptionDTO, ['id']) {}
