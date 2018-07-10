export class DatesService{
    dateToIsoString(date : Date) : string{
        return date.toISOString().toLocaleLowerCase().split("t")[0];
    }

    isoStringToDate(str : string) : Date{
        return new Date(str);
    }

    isValidDate(dateStr : string) : boolean{
        let tempDate = new Date(dateStr);
        return (tempDate.toString() != 'Invalid Date') && (dateStr)  ? true : false;
    }
}