set global log_bin_trust_function_creators = 1;
----
DROP FUNCTION IF EXISTS zn_plugin_survey_convert_openid;
CREATE FUNCTION zn_plugin_survey_convert_openid($openid varchar(50))
RETURNS VARCHAR(500)
BEGIN
DECLARE _temp varchar(500);
select concat(nickname, '&&__zn__&&', headimgurl) INTO _temp from zn_plugin_wechat_user where openid=$openid;
RETURN _temp;
END
