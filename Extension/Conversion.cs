using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace LeaveManagment.Extension
{
    public static class Conversion
    {
            public static int ToInt(this object value)
            {
                var retVal = 0;

                if (value == null || value == DBNull.Value) return retVal;
                if (value is bool)
                    if (Convert.ToBoolean(value, CultureInfo.InvariantCulture))
                        return 1;
                var numberToParse = value.ToString();

                return int.TryParse(numberToParse, out retVal) ? retVal : retVal;
            }

            public static double ToDouble(this object value)
            {
                double retVal = 0;

                if (value == null || value == DBNull.Value) return retVal;
                var numberToParse = value.ToString();

                return double.TryParse(numberToParse, out retVal) ? retVal : retVal;
            }

            public static short ToShort(this object value)
            {
                short retVal = 0;

                if (value == null || value == DBNull.Value) return retVal;
                var numberToParse = value.ToString();

                return short.TryParse(numberToParse, out retVal) ? retVal : retVal;
            }

            public static string FixParameter(this object value)
            {
                if (value == null || value == DBNull.Value) return null;

                return value.ToString().Replace("'", "''");
            }

            public static long ToLong(this object value)
            {
                long retVal = 0;

                if (value == null || value == DBNull.Value) return retVal;
                var numberToParse = value.ToString();

                return long.TryParse(numberToParse, out retVal) ? retVal : retVal;
            }

            public static bool ToBool(this object value)
            {
                bool retVal;

                if (value == null || value == DBNull.Value) return false;
                if (!(value is string)) return bool.TryParse(value.ToString(), out retVal) ? retVal : retVal;
                if (value.ToString().ToLower(Thread.CurrentThread.CurrentCulture).Equals("yes"))
                    return true;

                if (value.ToString().ToLower(Thread.CurrentThread.CurrentCulture).Equals("true"))
                    return true;

                return bool.TryParse(value.ToString(), out retVal) ? retVal : retVal;
            }

            public static decimal ToDecimal(this object value)
            {
                decimal retVal = 0;

                if (value == null || value == DBNull.Value) return retVal;
                var numberToParse = value.ToString();
                return decimal.TryParse(numberToParse, out retVal) ? retVal : retVal;
            }

            public static string ToUpperFirstLetterString(this object value)
            {
                if (value == null || value == DBNull.Value) return null;
                var str = value.ToString();
                if (string.IsNullOrWhiteSpace(str)) return str;
                var letters = str.ToCharArray();
                letters[0] = char.ToUpper(letters[0]);
                return new string(letters);
            }

            public static DateTime ToDateTime(this object value)
            {
                try
                {
                    if (string.IsNullOrWhiteSpace(value?.ToString()))
                        return DateTime.MinValue;

                    return value == DBNull.Value
                        ? DateTime.MinValue
                        : Convert.ToDateTime(value, Thread.CurrentThread.CurrentCulture);
                }
                catch (FormatException)
                {
                    //swallow the exception
                }
                catch (InvalidCastException)
                {
                    //swallow the exception
                }

                return DateTime.MinValue;
            }

            public static string ToText(this object value)
            {
                try
                {
                    if (value == null || value == DBNull.Value) return string.Empty;
                    if (value is bool)
                        return Convert.ToBoolean(value, CultureInfo.InvariantCulture) ? "true" : "false";

                    if (value == DBNull.Value)
                        return string.Empty;

                    var retVal = value.ToString();
                    return retVal;
                }
                catch (FormatException)
                {
                    //swallow the exception
                }
                catch (InvalidCastException)
                {
                    //swallow the exception
                }

                return string.Empty;
            }

            public static T ToEnum<T>(this object value)
            {
                if (string.IsNullOrWhiteSpace(value?.ToString())) return default(T);
                var str = value.ToString();
                return (T)Enum.Parse(typeof(T), str, true);
            }

            public static DateTime? ToDate(this DateTime? dateTime)
            {
                return dateTime?.Date;
            }
        
    }
}


