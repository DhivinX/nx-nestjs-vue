import { object, ObjectSchema, setLocale, number, string, bool } from 'yup';
import { UseSchema, yupLocale } from '@workspace/shared';

setLocale(yupLocale);

export const paginationDtoSchema: ObjectSchema<PaginationDto> = object().shape({
    page: number().optional().default(1).min(1),
    take: number().optional().default(10).min(1).max(50),
    sortBy: string().optional(),
    descending: bool().optional(),
    filter: string().optional(),
});

@UseSchema(paginationDtoSchema)
export class PaginationDto {
    page?: number;
    take?: number;
    sortBy?: string;
    descending?: boolean;
    filter?: string;
}
