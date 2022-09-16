import { object, SchemaOf, setLocale, number, string, bool } from 'yup';
import { UseSchema, yupLocale } from '@nx-vnts/utils';

setLocale(yupLocale);

export const paginationDtoSchema: SchemaOf<PaginationDto> = object().shape({
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
