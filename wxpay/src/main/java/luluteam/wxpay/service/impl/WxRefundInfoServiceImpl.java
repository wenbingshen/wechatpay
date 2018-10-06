package luluteam.wxpay.service.impl;


import luluteam.wxpay.entity.WxRefundInfoEntity;
import luluteam.wxpay.repository.WxRefundInfoRepository;
import luluteam.wxpay.service.WxRefundInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WxRefundInfoServiceImpl implements WxRefundInfoService {

    @Autowired
    private WxRefundInfoRepository wxRefundInfoRepository;

    public void save(WxRefundInfoEntity wxRefundInfoEntity) {
        wxRefundInfoRepository.save(wxRefundInfoEntity);
    }
}
