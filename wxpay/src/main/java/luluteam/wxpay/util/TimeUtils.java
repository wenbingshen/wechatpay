package luluteam.wxpay.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by Hyman on 2017/2/28.
 */
public class TimeUtils {

    //TODO 都未处理输入参数

    public static String getFormatTime(Date date, String format) {
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        return sdf.format(date);
    }

    public static Date addDay(Date date, int day) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, 2);
        return cal.getTime();
    }

    public static Date minusDay(Date date, int day) {
        return addDay(date, -day);
    }

    /**
     * 获取当前时间 yyyyMMddHHmmss
     * @return String
     */
    public static String getCurrTime() {
        Date now = new Date();
        SimpleDateFormat outFormat = new SimpleDateFormat("yyyyMMddHHmmss");
        String s = outFormat.format(now);
        return s;
    }

    /**
     * 获取从1970年开始到现在的秒数
     *
     * @param
     * @return
     */
    public static String getTimeStamp() {
        long seconds = System.currentTimeMillis() / 1000;
        return String.valueOf(seconds);
    }


}
