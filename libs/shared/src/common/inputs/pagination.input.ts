import { object, SchemaOf, setLocale, number } from 'yup';
import { UseSchema, yupLocale } from '@nx-vnts/utils';

setLocale(yupLocale);

export const paginationDtoSchema: SchemaOf<PaginationDto> = object().shape({
    page: number().optional().default(1).min(1),
    take: number().optional().default(10).min(1).max(50),
});

@UseSchema(paginationDtoSchema)
export class PaginationDto {
    page: number;
    take?: number;
}
