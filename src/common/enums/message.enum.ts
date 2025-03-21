export enum UserMessages {
    USER_NOT_FOUND = "کاربری با این شماره یافت نشد"
}

export enum AuthMessages {
    OTP_EXPIRED = "کد تایید منقضی شده است",
    OTP_SENT = "کد تایید ارسال شد",
    OTP_INCORRECT = "کد تایید اشتباه است",
    LOGIN_AGAIN = "لطفا دوباره وارد شوید",
    LOGIN_SUCCESS = "ورود با موفقیت انجام شد",
    REFRESH_TOKEN_SUCCESS = "توکن رفرش شد",
    LOGOUT_SUCCESS = "خروج با موفقیت انجام شد",
    LOGOUT_FAILED = "خروج با مشکل روبرو شد",
    OTP_ALREADY_SENT = "کد تایید قبلا ارسال شده است"
}

export enum TokenMessages {
    SOMETHING_WENT_WRONG = "مشکلی در انجام عملیات رخ داده است",
    TRY_AGAIN = "خطایی در ساخت توکن رخ داده است لطفا دوباره تلاش کنید"
}