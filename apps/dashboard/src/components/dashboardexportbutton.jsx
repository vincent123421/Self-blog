// src/components/DashboardExportButton.jsx
import React, { useRef } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import html2canvas from 'html2canvas';

const DashboardExportButton = ({ dashboardRef }) => {
  const toast = useToast();

  const handleExport = async () => {
    if (!dashboardRef.current) {
      toast({
        title: '错误',
        description: '无法找到仪表盘',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const loadingToast = toast({
        title: '正在导出...',
        status: 'loading',
        duration: null,
        isClosable: false,
      });

      const canvas = await html2canvas(dashboardRef.current, {
        scale: 2, // 高清 2x
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 15000,
      });

      const link = document.createElement('a');
      link.download = `dashboard-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast.close(loadingToast);
      toast({
        title: '导出成功！',
        description: '图片已下载',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('导出失败:', error);
      toast.closeAll();
      toast({
        title: '导出失败',
        description: '请重试',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Button
      size="sm"
      colorScheme="blue"
      onClick={handleExport}
      leftIcon={<span>⬇️</span>}
    >
      一键导出
    </Button>
  );
};

export default DashboardExportButton;
