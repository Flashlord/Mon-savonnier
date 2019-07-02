<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class FrontController extends AbstractController
{

    public function productListPage()
    {
        return $this->render("page/product-list.html.twig");
    }

    public function productDetailPage()
    {
        return $this->render("page/product.html.twig");
    }

    public function homePage()
    {
        return $this->render("page/home.html.twig");
    }

    public function basketPage()
    {
        return $this->render("page/basket.html.twig");
    }

    public function error500Page()
    {
        return $this->render("page/error-500.html.twig");
    }

    public function error404Page()
    {
        return $this->render("page/error-404.html.twig");
    }

    public function contactPage()
    {
        return $this->render("page/contact.html.twig");
    }

    public function subscribingSigninPage()
    {
        return $this->render("page/sign-in.html.twig");
    }

    public function deliveryPage()
    {
        return $this->render("page/delivery.html.twig");
    }

    public function paymentPage()
    {
        return $this->render("page/payment.html.twig");
    }

    public function cmsPage()
    {
        return $this->render("page/about-us.html.twig");
    }
}