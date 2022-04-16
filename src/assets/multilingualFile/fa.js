const fa = {
    message: {
        loingEnterPhone: "شماره موبایل خود را وارد کنید",
        textPrivacy: 'جالیزان به عنوان یک ارائه دهنده سرویس های سطح مزرعه از جمله پایش تصاویر ماهواره ای، مشاوره خاک و گیاه، اطلاعات هواشناسی، ارتباط با کارشناسان و غیره، تابع کلیه قوانین و مقررات جمهوری اسلامی ایران است؛ توافق نامه زیر در خصوص استفاده از مناسب و ایمن از اپلیکیشن جالیزان و جلوگیری از سوء استفاده احتمالی تدوین شده است.\n' +
            'این توافق تعیین کننده تعهدات و تکالیف طرفین، بین شرکت توکان فاطر مهام به شماره ثبت 523598 به عنوان طرف اول و کاربر اپلیکیشن جالیزان به عنوان طرف دوم، منعقد می شود. شرکت توکان فاطر مهام (توفام) صاحب امتیاز سرویس های یکپارچه جالیزان است که از این پس در متن "جالیزان" نامیده می شود و کاربر اپلیکیشن جالیزان "کاربر". تایید این شرایط استفاده به منزله قبول و امضای الکترونیکی قرارداد است.\n' +
            'کلیه حقوق مادی و معنوی تمامی اپلیکیشن های جالیزان و نیز لوگو (نشانه تجاری) آن متعلق به شرکت توکان فاطر مهام به شماره ثبت 523598 است. \n' +
            'هرگونه استفاده از نام، مطالبات و مستندات و منابع جالیزان بدون مجوز کتبی شرکت، مطابق با قوانین جرایم رایانه ای (قانون جرایم رایانه ای 11/11/1389 – کارگروه تعیین مصادیق مجرمانه) غیر مجاز تلقی شده و جالیزان حق پیگرد قانونی در مراجع ذیصلاح را برای خود محفوظ میدارد. مجوز استفاده از اپلیکیشن جالیزان طبق شرایط استفاده حاضر، تنها برای استفاده یک مشتری حقیقی و به نام آن است. \n' +
            'هرگونه کپی برداری و سعی در نفوذ به داده های جالیزان، طبق قوانین حاکم بر جمهوری اسلامی ایران غیر مجاز تلقی شده و موجب پیگرد قانونی خواهد شد.\n' +
            'کاربر حق استفاده از علایم و نشان های تجاری ثبت شده و ثبت نشده که در جالیزان به نمایش در آمده است را ندارد. این ممنوعیت در مورد تمام اجزای فنی و غیر فنی تمامی ابزار ها، وب سایت و اپلیکیشن های جالیزان لازم الاجرا است. گفتنی است تخطی از این ممنوعیت با عناوینی مثل صدور اجازه یا حق ضمنی و تلویحی، یا عدم انکار پس از قبول و غیره قابل توجیه نیست.\n' +
            'هرگونه استفاده از خدمات اپلیکیشن جالیزان که طبق قوانین موضوعه کشور از قبیل قانون جرائم رایانه ای و قانون مجازات اسلامی رفتار یا عمل مجرمانه محسوب شود، ممنوع می باشد. \n' +
            'ثبت موقعیت مزرعه متعلق به غیر و یا موقعیت کشت محصولاتی که تملک قانونی منطقه ثبت شده آنها منحصرا برای کاربر نباشد، غیر قانونی و ممنون است. \n' +
            'مطلوب است جهت حفظ امنیت اطلاعات توجه شود که دامنه مورد استفاده توسط جالیزان به صورت مستقیم با https://jalizan.com یا غیر مستقیم یکی از زیر دامنه هایی مانند https://app.jalizan.com  می باشد. و کاربر موظف است جهت مقابله با حملات فیشینگ به آدرس دامنه در مرورگر دقت نماید. \n' +
            'کاربر مسئول حفظ و مراقبت از رمز دریافتی احراز هویت است. به صورتی کد ارسالی را به هیچ صورتی به غیر منتظر ننماید. چنانچه بر اثر عدم حافظت و یا افشای کاربر از این اطلاعات خسارتی به او وارد شود، جلیزان مسئولیتی در این مورد نخواهد داشت. کاربر مکلف است در صورت مفقود شدن و یا سرقت گوشی، بلافاصله مراتب را با شماره پشتیبانی جالیزان اعلام نماید تا دسترسی به حساب کاربری مسدود شود. این شرایط در صورت واگذاری گوشی موبایل و یا شماره خط نیز صادق بوده و کاربر باید موارد مذکور را رعایت نماید.\n' +
            'بدیهی است جالیزان خود را متعهد میداند تمامی تلاش و ظرفیت خود را جهت حفظ اطلاعات و امنیت کاربران به کار گیرد.\n' +
            'جالیزان میتواند هر زمان که صلاح بداند در شرایط و مقررات، تغییرات لازم را اعمال نماید. این تغییرات به نحو مقتضی به اطلاع کاربر خواهد رسید و او موظف به رعایت و اجرای آن در زمان اطلاع می باشد.\n' +
            'اطلاعات موقعیت جغرافیایی کاربر برای ارائه خدمات مناسب در سیستم ذخیره خواهد شد.\n' +
            'جهت بهبود کیفیت سرویس رسانی جالیزان، اطلاعات سخت افزار موبایل، نوع سیستم عامل و شماره کاربر (پس از ورود توسط وی) در سیستم ذخیره خواهد شد.'
    }

}

export default fa;