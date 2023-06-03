<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authorize extends Middleware
{
    function checkAbilities(Request $request) {
        return $request;
        // $route = $request->path();
        // $method = $request->method();
        //  $request->user()->role()->ressources()->get();
   // parcourir le tableau de ressources et v2rifier s'il y a la ressource->$method = $method et rssource->$uri = $route
   // si c'est trouve alors il peut continuer sinon 403

    }

}
