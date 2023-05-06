
import { Router, Request, Response } from 'express';
import { CookieMakerApp } from '..';

export class OrderRouter {
    public readonly router: Router = Router()
    constructor(private cmapp: CookieMakerApp) {
        this.setUpRoutes();
    }

    setUpRoutes() {
        this.router.get('/summary', this.sumary);
        this.router.get('/thanks', this.thanks);
    }

    sumary = (req: Request, res:Response): void => {
        const {sum, addons, base, allBases, allAddons} = this.cmapp.getCookieSettings(req);

        res.render('order/summary', {
            cookie: {
                base,
                addons,
            },
            allBases,
            allAddons,
            sum,
        });
    };

    thanks = (req:Request, res:Response):void => {
        const {sum} = this.cmapp.getCookieSettings(req);

        res
            .clearCookie('cookieBase')
            .clearCookie('cookieAddons')
            .render('order/thanks', {
                sum,
            });
    }
}

